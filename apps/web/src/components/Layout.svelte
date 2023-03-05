<header class="bg-purple-600 px-4 py-6">
  <h1>
    <a href="/" target="_self">PrivateNotes</a>
  </h1>
</header>

<div class="flex h-full bg-cyan-100">
  <aside class="basis-1/5 bg-amber-500 p-6">
    <slot name="aside" />
  </aside>

  <main class="basis-full flex flex-col basis-4/5 bg-green-300 p-6">
    <slot name="main" />
  </main>
</div>

<footer class="bg-purple-800 p-6">
  <div>{`PrivateNotes v${import.meta.env.VITE_APP_VERSION}`}</div>
</footer>
