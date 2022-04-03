import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Navbar: React.FC = () => {
  const [shown, setShown] = useState(false);

  return (
    <>
      <nav className="p-4 flex items-center justify-between backdrop-blur-sm fixed top-0 right-0 left-0 z-10">
        <Link href="/">
          <a className="text-color4 text-2xl hover:text-color5 transition-colors" onClick={() => setShown(false)}>
            lukasstaub
          </a>
        </Link>
        <FaBars className="text-color4 text-2xl hover:cursor-pointer" onClick={() => setShown(true)} />
      </nav>
      <AnimatePresence>
        {shown && (
          <motion.div className="backdrop-blur-lg fixed right-0 top-0 bottom-0 z-20 flex flex-col justify-between items-center py-28 lg:py-48" style={{ width: "max(min(425px, 100%), 35%)" }} animate={{ translateX: 0 }} initial={{ translateX: "100%" }} exit={{ translateX: "100%" }} transition={{ type: "tween" }}>
            {["About", "Contact", "Projects", "Skills", "Links" /*, "Blogs"*/].map((el, index) => (
              <Link href={`/${el.toLowerCase()}`} key={index}>
                <a onClick={() => setShown(false)} className="text-color4 text-xl bg-color2 rounded-lg p-3 w-[62.5%] mx-4 text-center">
                  {el}
                </a>
              </Link>
            ))}
            <button className="text-color4 text-xl bg-color5 rounded-lg p-3 w-[62.5%] mx-4 text-center" onClick={() => setShown(false)}>
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
