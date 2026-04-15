import { useEffect, useImperativeHandle, useRef, useState } from "react";
import styles from "./Select.module.css";
import clsx from "clsx";

export interface MenuRef {
    open: () => void;
    close: () => void;
}

export interface SelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  ref?: React.RefObject<MenuRef>;
}

function Select({ options, value, onChange, ref }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (hostRef.current && !hostRef.current.contains(target)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('click', handleClickOutside, { capture: true });
    return () => window.removeEventListener('click', handleClickOutside, { capture: true });
  }, []);

  useImperativeHandle(ref, () => ({
    open: () => {
        setIsOpen(true);
        console.log('open');
    },
    close: () => setIsOpen(false),
  }));

  return (
    <div className={styles.Select} ref={hostRef}>
      <div className={styles.label} onClick={handleToggle}>
        {value}
      </div>
      {/* {isOpen && ( */}
        <div className={clsx(styles.options, !isOpen && styles.close)}>
          {options.map((option) => (
            <div
              className={styles.option}
              key={option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
    {/*    )} */}
    </div>
  );
}

export default Select;

// import styles from "./Select.module.css";

// export interface SelectProps<T extends string> {
//     options: T[];
//     value: T;
//     onChange: (value: T) => void;
// }

// function Select<T extends string>({ options, value, onChange }: SelectProps<T>) {

//     return (
//         <div className={styles.Select}>
//             <div className={styles.label}>{value}</div>
//             <div className={styles.options}>
//                 {options.map((option) => (
//                     <div className={styles.option} key={option} onClick={() => onChange(option)}>{option}</div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Select;
