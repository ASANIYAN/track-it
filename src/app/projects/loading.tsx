import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  <section className="flex items-center mt-5 gap-4">
    {[1, 2, 3].map((n) => (
      <Skeleton
        key={n}
        className="h-[250px] w-[250px] rounded-[10px] border border-color4 bg-white dark:border-darkColor4 dark:bg-darkColor2"
      />
    ))}
  </section>;
}
