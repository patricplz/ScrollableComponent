import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Componente que permite hacer scroll horizontal y vertical al arrastrar con el ratón.
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Elementos hijos a renderizar dentro del componente.
 * @param {string} props.className - Clases CSS adicionales.
 * @param {boolean} props.verticalScroll - Permite habilitar también el scroll vertical.
 * @returns {JSX.Element} Componente ScrollableComponent.
 */
const ScrollableComponent = ({ 
  children, 
  className = '',
  verticalScroll = false, 
  horizontalScroll = false,
  onDragStart,
  onDrag,
  onDragEnd
}) => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [isInteractiveElement, setIsInteractiveElement] = useState(false);

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

    setIsInteractiveElement(false);
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setStartY(e.pageY - containerRef.current.offsetTop);
    setScrollLeft(containerRef.current.scrollLeft);
    setScrollTop(containerRef.current.scrollTop);

    if (onDragStart) onDragStart(e);

    e.preventDefault();
  }, [checkIfInteractive, onDragStart]);

  // Mover durante el arrastre
  const handleMouseMove = useCallback((e) => {
    if (!isDragging || isInteractiveElement) return;

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

  }, [isDragging, isInteractiveElement, startX, startY, scrollLeft, scrollTop, verticalScroll, onDrag]);

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
