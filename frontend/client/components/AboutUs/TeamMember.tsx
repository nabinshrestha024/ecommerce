import Image from "next/image";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  link: string;
}

export const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  role,
  image,
  link,
}) => {
  return (
    <a href={link} className="text-center">
      <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
        <Image
          src={image}
          alt={name}
          width={192}
          height={192}
          className="object-cover"
        />
      </div>
      <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
      <p className="text-[#4EA674] font-medium">{role}</p>
    </a>
  );
};
