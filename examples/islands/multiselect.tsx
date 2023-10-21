import IconX from "tabler/x.tsx";
import IconSearch from "tabler/search.tsx";
import { computed, Signal, useSignal } from "@preact/signals";

export default function MultiSelect({
  selected,
  choices = [],
  name,
  label,
}: {
  selected: Signal<string[]>;
  choices?: string[];
  name?: string;
  label?: string;
}) {
  // const selected = useSignal<string[]>([]);
  const query = useSignal("");
  const filteredTag = computed(() => {
    // return tags.filter((t) => !selected.value.includes(t));
    return choices.filter(
      (t) => t.includes(query.value) && !selected.value.includes(t)
    );
  });
  const opened = useSignal(false);

  return (
    <div>
      <label class="text-slate-700" for={name}>
        {label || name}
      </label>
      {/* input for searchin g tags */}
      {selected.value.length > 0 && (
        <div class="flex flex-row flex-wrap gap-2">
          {selected.value.map((tag) => (
            <div class="flex flex-row items-center bg-lime-200 rounded-md p-1 gap-1">
              <span>{tag}</span>
              <IconX
                size={10}
                class="mt-1 cursor-pointer"
                onClick={() => {
                  selected.value = selected.value.filter((t) => t !== tag);
                }}
              />
            </div>
          ))}
        </div>
      )}
      <div class="flex flex-col rounded-md mt-2">
        <div
          class="flex flex-row flex-1 items-center gap-2 rounded-md"
          onClick={() => {
            opened.value = true;
          }}
        >
          <IconSearch size={20} class="absolute left-6 z-20" />
          <input
            class="p-2 pl-8 flex-1 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10"
            value={query.value}
            onInput={(e) => {
              query.value = e.currentTarget.value;
            }}
          />
        </div>

        {opened.value && (
          <div class="flex max-h-28 overflow-scroll flex-auto flex-wrap gap-2 mt-0 bg-slate-200 p-2 rounded-b-lg">
            <button
              class="absolute right-5"
              onClick={() => {
                opened.value = false;
                query.value = "";
              }}
            >
              <IconX size={20} />
            </button>
            {filteredTag.value.length == 0 ? (
              !selected.value.includes(query.value) ? (
                <button
                  type="button"
                  class="rounded-md p-1 bg-lime-200 "
                  onClick={() => {
                    selected.value = [...selected.value, query.value];
                    query.value = "";
                  }}
                >
                  {query.value}
                </button>
              ) : (
                <p class="text-slate-500">Tag is already added</p>
              )
            ) : (
              filteredTag.value.map((tag) => (
                <button
                  type="button"
                  class="rounded-md p-1 bg-lime-200 "
                  onClick={() => {
                    selected.value = [...selected.value, tag];
                  }}
                >
                  {tag}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
