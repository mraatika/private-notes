import { component$, Slot } from '@builder.io/qwik';
import { loader$ } from '@builder.io/qwik-city';

export const useServerTimeLoader = loader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  const serverTime = useServerTimeLoader();
  return (
    <>
      <main class="grow">
        <header class="flex bg-teal-300">
          <h1>
            <a href="/" target="_self" class="p-6">
              PrivateNotes
            </a>
          </h1>
        </header>
        <Slot />
      </main>

      <footer class="p-6 bg-teal-300">
        <div>Private notes v0.1.0</div>
        <div>{serverTime.value.date}</div>
      </footer>
    </>
  );
});
