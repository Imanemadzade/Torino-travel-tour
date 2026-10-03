import LocationIcon from "@/icons/LocationIcon";
import { cityToFa } from "core/utils/cityToFa";

function CityDropdown({
  className,
  cities,
  // تغییر ۱: پراپ جدید search برای گرفتن متنی که کاربر در input تایپ کرده
  // مقدار پیش‌فرض "" است تا اگر پاس داده نشد، .trim() خطا ندهد
  search = "",
  setIsDropdownOpen,
  setValue,
  field,
}) {
  // تغییر ۲: حذف فاصله‌های اول و آخر متن تایپ‌شده
  const keyword = search.trim();

  // تغییر ۳: فیلتر شهرها بر اساس نام فارسی
  // - cityToFa(...) برای شهرهای بدون ترجمه null یا undefined برمی‌گرداند
  //   و علامت ?. جلوی کرش را می‌گیرد، پس این شهرها از لیست حذف می‌شوند
  // - includes یعنی جستجوی بخشی (تایپ "سنن" شهر سنندج را پیدا می‌کند)
  // - وقتی input خالی است includes("") همیشه true است، پس همه شهرها نمایش داده می‌شوند
  const filteredCities = cities?.filter((city) =>
    cityToFa(city.name)?.includes(keyword)
  );

  return (
    <div
      className={`w-full right-0 mt-1 z-10 bg-white border border-[#00000020] rounded-xl overflow-hidden  absolute top-full flex flex-col ${className}`}
    >
      <p className="bg-[#F8F8F8] py-2 pr-3 text-[#282828B2] text-[13px] font-light">
        پرتردد
      </p>

      {/* تغییر ۴: اگر بعد از فیلتر حداقل یک شهر مانده بود، لیست را نشان بده
          در غیر این صورت پیام «توری وجود ندارد» را نمایش بده */}
      {filteredCities?.length ? (
        // تغییر ۵: به جای cities از filteredCities map می‌گیریم
        filteredCities.map((city) => (
          <div
            key={city.id}
            onClick={() => {
              setValue(`${field}Id`, city.id);
              setValue(`${field}Name`, cityToFa(city.name));
              setIsDropdownOpen(null);
            }}
            className="pr-2 py-3 text-[#282828] flex gap-2 items-center border-b border-b-[#0000001F] hover:text-white hover:bg-[#aaaaaa]"
          >
            <LocationIcon className="size-5" />
            <p>{cityToFa(city.name)}</p>
          </div>
        ))
      ) : (
        // تغییر ۶: پیام حالتی که هیچ شهری با متن تایپ‌شده مطابقت ندارد
        <p className="py-3 text-center text-[14px] text-[#282828B2]">
          چنین شهری وجود ندارد
        </p>
      )}
    </div>
  );
}

export default CityDropdown;
