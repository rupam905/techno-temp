const navigation = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "About", href: "#" },
  { name: "Contact", href: "/contact" },
];
const Head = () => {
  return (
    <div className="">
      <nav
        aria-label="Global"
        className="flex items-center justify-between z-40 p-6 lg:px-8 fixed w-full">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5 flex">
            <img src="/images/technothon.png" alt="" className="h-15 mx-auto" />
          </a>
        </div>
        <div className="flex gap-x-12 rounded-full ring-1 ring-gray-200/20 px-7 py-2 backdrop-blur-3xl">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm/6 font-semibold text-gray-900">
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Head;

