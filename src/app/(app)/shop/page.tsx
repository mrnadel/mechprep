import { GemShop } from '@/components/engagement/GemShop';
import { CourseHeader } from '@/components/course/CourseHeader';

export default function ShopPage() {
  return (
    <>
      <CourseHeader />
      <div className="px-4 sm:px-5 py-5 sm:py-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">Gem Shop</h1>
        <GemShop />
      </div>
    </>
  );
}
