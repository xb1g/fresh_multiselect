import { useSignal } from "@preact/signals";
import MultiSelect from "$fresh_multiselect";

export default function Home() {
  const selected = useSignal([]);
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">Multiselect Example</h1>
      </div>
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <MultiSelect selected={selected} choices={["a", "b", "c"]} label="yo" />
      </div>
    </div>
  );
}
