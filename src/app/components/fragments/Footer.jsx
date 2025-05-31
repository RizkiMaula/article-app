import LogoWhite from './LogoWhite';
export default function Footer() {
  return (
    <footer className=" bg-[#2563EBDB] text-white text-center py-4 w-full flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3">
      <LogoWhite />
      <p>© 2025 Blog genzet. All rights reserved</p>
    </footer>
  );
}
