import { useEffect, useRef, useState } from 'react';

/**
 * Detects when an element enters the viewport and remains visible.
 * Triggers only once — after the element is seen, it stays visible.
 *
 * @param {object}   options
 * @param {number}   [options.threshold=0.1]   - IntersectionObserver threshold
 * @param {string}   [options.rootMargin='0px 0px -40px 0px'] - Observer root margin
 * @returns {[React.RefObject, boolean]} [ref, isVisible]
 */
export function useAnimateIn(options = {}) {
  const { threshold = 0.1, rootMargin = '0px 0px -40px 0px' } = options;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}
