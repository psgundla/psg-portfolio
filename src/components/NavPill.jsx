import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export default function NavPill() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const sections = ["work", "life", "contact"].map(id => document.getElementById(id)).filter(Boolean);
    const update = () => {
      let current = "";
      for (const section of sections) if (section.getBoundingClientRect().top <= window.innerHeight * .45) current = section.id;
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const root = useRef(null);
  const trigger = useRef(null);
  const reduced = useReducedMotion();
  const spring = reduced ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 24, mass: 0.75 };

  useEffect(() => {
    if (!open) return;
    const onKey = event => {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
    };
    const onPointer = event => {
      if (!root.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div className="nav-pill-position">
      <motion.nav className="nav-pill" ref={root} aria-label="Primary navigation"
        transition={spring}
        style={{ width: open ? "min(360px, calc(100vw - 112px))" : "min(240px, calc(100vw - 112px))" }}
        onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
        <div className="nav-desktop-links">{["Work", "Life", "Contact"].map(label => <a key={label} href={`#${label.toLowerCase()}`} aria-current={active === label.toLowerCase() ? "location" : undefined}>{label}</a>)}</div>
        <motion.button className="nav-pill-trigger" type="button" ref={trigger}
          aria-expanded={open} aria-controls="primary-navigation" aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)} whileTap={reduced ? {} : { scale: 0.96 }}>
          <motion.span className="nav-pill-ring" aria-hidden="true" animate={{ rotate: open && !reduced ? 135 : 0 }} transition={spring} />
          <span>{open ? "Explore" : "Menu"}</span>
          <motion.span className="nav-pill-plus" aria-hidden="true" animate={{ rotate: open ? 45 : 0 }} transition={spring}>+</motion.span>
        </motion.button>
        <div id="primary-navigation" hidden={!open}>
          <AnimatePresence initial={false}>
            {open && <motion.div className="nav-pill-links" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : 0.18 }}>
              {["Work", "Life", "Contact"].map((label, index) => (
                <motion.a key={label} href={`#${label.toLowerCase()}`} aria-current={active === label.toLowerCase() ? "location" : undefined} onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: reduced ? 0 : -8 }} animate={{ opacity: 1, y: 0 }}
                  transition={reduced ? { duration: 0 } : { ...spring, delay: index * 0.035 }}
                  whileHover={reduced ? {} : { x: 5 }}>
                  <span>{label}</span>
                </motion.a>
              ))}
            </motion.div>}
          </AnimatePresence>
        </div>
      </motion.nav>
    </div>
  );
}
