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
  onCtrlDragChange 
}) => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [isInteractiveElement, setIsInteractiveElement] = useState(false);
  const [isCtrlDragging, setIsCtrlDragging] = useState(false); 

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

  const handleMouseDown = useCallback((e) => {
    if (checkIfInteractive(e.target)) {
      setIsInteractiveElement(true);
      return;
    }

    if (e.ctrlKey) {
      setIsInteractiveElement(false);
      setIsDragging(true);
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setStartY(e.pageY - containerRef.current.offsetTop);
      setScrollLeft(containerRef.current.scrollLeft);
      setScrollTop(containerRef.current.scrollTop);

      if (e.ctrlKey) {
        setIsCtrlDragging(true);
        if (onCtrlDragChange) onCtrlDragChange(true);
      }

      if (onDragStart) onDragStart(e);
      e.preventDefault();
    }
  }, [checkIfInteractive, onDragStart, onCtrlDragChange]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || isInteractiveElement) return;

    if (e.ctrlKey) {
      if (horizontalScroll) {
        const x = e.pageX - containerRef.current.offsetLeft;
        const walkX = (x - startX) * 1.2;
        containerRef.current.scrollLeft = scrollLeft - walkX;
      }
      if (verticalScroll) {
        const y = e.pageY - containerRef.current.offsetTop;
        const walkY = (y - startY) * 1.2;
        containerRef.current.scrollTop = scrollTop - walkY;
      }
      if (onDrag) onDrag(e);

      if (e.ctrlKey && !isCtrlDragging) {
        setIsCtrlDragging(true);
        if (onCtrlDragChange) onCtrlDragChange(true); 
      } else if (!e.ctrlKey && isCtrlDragging) {
        setIsCtrlDragging(false);
        if (onCtrlDragChange) onCtrlDragChange(false); 
      }
    }
  }, [isDragging, isInteractiveElement, startX, startY, scrollLeft, scrollTop, verticalScroll, onDrag, onCtrlDragChange, isCtrlDragging]);

  const resetPosition = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
      containerRef.current.scrollLeft = 0;
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);

    if (isCtrlDragging) {
      setIsCtrlDragging(false);
      if (onCtrlDragChange) onCtrlDragChange(false);
    }
    if (onDragEnd) onDragEnd();
  }, [onDragEnd, isCtrlDragging, onCtrlDragChange]);

  const handleContextMenu = useCallback((e) => {
    if (isDragging) {
      e.preventDefault();
    }
  }, [isDragging]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('contextmenu', handleContextMenu);

    if (isDragging) {
      container.querySelectorAll('*').forEach(el => {
        el.style.cursor = 'grabbing';
      });
      container.style.cursor = 'grabbing';
    } else {
      container.querySelectorAll('*').forEach(el => {
        el.style.cursor = '';
      });
      container.style.cursor = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [handleMouseMove, handleMouseUp, handleContextMenu, isDragging]);

  const scrollStyle = {
    overflowX: horizontalScroll ? 'auto' : 'hidden',
    overflowY: verticalScroll ? 'auto' : 'hidden',

  };

  useImperativeHandle(childRef, () => {
    return {
      resetPosition,
      isCtrlDragging 
    };
  }, [resetPosition, isCtrlDragging]);

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