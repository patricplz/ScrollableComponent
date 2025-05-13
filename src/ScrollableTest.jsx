import { use, useImperativeHandle } from 'react';
import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Componente que permite hacer scroll horizontal y vertical al arrastrar con el ratón.
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Elementos hijos a renderizar dentro del componente.
 * @param {string} props.className - Clases CSS adicionales.
 * @param {boolean} props.verticalScroll - Permite habilitar también el scroll vertical.
 * @param {boolean} props.horizontalScroll - Permite habilitar también el scroll horizontal.
 * @param {function} props.onDragStart - Función que se ejecuta al iniciar el arrastre.
 * @param {function} props.onDrag - Función que se ejecuta durante el arrastre.
 * @param {function} props.onDragEnd - Función que se ejecuta al finalizar el arrastre.
 * @param {React.Ref} props.childRef - Ref para acceder a métodos del componente hijo desde el padre.
 * @param {boolean} props.isDragable - Controla si el arrastre solo funciona con la tecla Ctrl.
 * @returns {JSX.Element} Componente ScrollableComponent.
 */
const ScrollableComponent = ({
  children,
  className = '',
  verticalScroll = false,
  horizontalScroll = false,
  onDragStart,
  onDrag,
  onDragEnd,
  childRef,
  isDragable = false
}) => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [isInteractiveElement, setIsInteractiveElement] = useState(false);
  const shouldDragWithCtrl = useCallback((event) => {
    return isDragable && event.ctrlKey;
  }, [isDragable]);

  // Verifica si el evento se originó en un elemento interactivo
  const checkIfInteractive = useCallback((target) => {
    const interactiveElements = ['INPUT', 'SELECT', 'BUTTON', 'TEXTAREA', 'A'];
    let element = target;

    while (element && element !== containerRef.current) {
      if (interactiveElements.includes(element.tagName) ||
          element.hasAttribute('role') ||
          element.hasAttribute('tabindex')) {
        return true;
      }
      element = element.parentElement;
    }
    return false;
  }, []);

  // Iniciar el arrastre
  const handleMouseDown = useCallback((e) => {
    if (checkIfInteractive(e.target)) {
      setIsInteractiveElement(true);
      return;
    }

    // Solo iniciar el arrastre si isDragable es false o si Ctrl está presionado
    if (!isDragable || e.ctrlKey) {
      setIsInteractiveElement(false);
      setIsDragging(true);
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setStartY(e.pageY - containerRef.current.offsetTop);
      setScrollLeft(containerRef.current.scrollLeft);
      setScrollTop(containerRef.current.scrollTop);

      if (onDragStart) onDragStart(e);

      e.preventDefault();
    }
  }, [checkIfInteractive, onDragStart, isDragable]);

  // Mover durante el arrastre
  const handleMouseMove = useCallback((e) => {
    if (!isDragging || isInteractiveElement) return;

    // Solo permitir el movimiento si isDragable es false o si Ctrl está presionado
    if (!isDragable || e.ctrlKey) {
      if (horizontalScroll) {
        const x = e.pageX - containerRef.current.offsetLeft;
        const walkX = (x - startX) * 1.2; // Multiplicador para ajustar sensibilidad
        containerRef.current.scrollLeft = scrollLeft - walkX;
      }
      if (verticalScroll) {
        const y = e.pageY - containerRef.current.offsetTop;
        const walkY = (y - startY) * 1.2;
        containerRef.current.scrollTop = scrollTop - walkY;
      }

      if (onDrag) onDrag(e);
    }
  }, [isDragging, isInteractiveElement, startX, startY, scrollLeft, scrollTop, verticalScroll, onDrag, isDragable]);

  const resetPosition = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
      containerRef.current.scrollLeft = 0;
    }
  }, []);

  // Finalizar el arrastre
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (onDragEnd) onDragEnd();
  }, [onDragEnd]);

  // Prevenir el comportamiento predeterminado del clic derecho durante el arrastre
  const handleContextMenu = useCallback((e) => {
    if (isDragging) {
      e.preventDefault();
    }
  }, [isDragging]);

  // Configurar y limpiar event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [handleMouseMove, handleMouseUp, handleContextMenu]);

  // Estilos dinámicos
  const scrollStyle = {
    overflowX: horizontalScroll ? 'auto' : 'hidden',
    overflowY: verticalScroll ? 'auto' : 'hidden',
    userSelect: 'none',
  };


  //Function for pass functions to be triggered on father
  useImperativeHandle(childRef, () => {
    return {
      resetPosition,
    };
  }, [resetPosition]);


  return (
    <div
      ref={containerRef}
      className={`${className} w-full h-full`}
      style={scrollStyle}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
};

export default ScrollableComponent;