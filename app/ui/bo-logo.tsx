import BoImage from '@/public/bo_avator.jpg';
import { lusitana } from '@/app/ui/fonts';

export default function BoLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <img src={BoImage.src} alt="Bo" className="h-12 w-12 mr-2 rotate-[-0deg] rounded-full shadow-0" />
      <p className="text-[44px]">Bo</p>
    </div>
  );
}