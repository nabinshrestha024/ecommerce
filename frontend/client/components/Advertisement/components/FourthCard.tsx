export const FourthCard = () => {
  const advertisements = [
    { src: "/advertisement/trousers.png", alt: "Sample Advertisement 1" },
    { src: "/advertisement/watch.png", alt: "Sample Advertisement 2" },
    { src: "/advertisement/denim.png", alt: "Sample Advertisement 3" },
    { src: "/advertisement/philips.png", alt: "Sample Advertisement 4" },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 pr-2">
      {advertisements.map((ad, index) => (
        <div key={index}>
          <img
            src={ad.src}
            alt={ad.alt}
            className="w-full h-48 object-fit rounded-xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.2)]"
          />
        </div>
      ))}
    </div>
  );
};
