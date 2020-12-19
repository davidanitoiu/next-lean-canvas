import { FieldSet } from 'components';
import { canvasSegments } from 'data';
import { map } from 'lodash';
import Head from 'next/head';
import * as React from 'react';

function Home() {
  const [darkMode, setDarkMode] = React.useState(true);

  const handleDarkMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    setDarkMode(prevValue => !prevValue)
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataEntries = new FormData(e.currentTarget).entries();
    const formValues = Object.fromEntries(formDataEntries);

    alert(JSON.stringify(formValues, undefined, 2));

  }

  return (
    <div className={`min-h-screen grid place-items-center w-full ${darkMode ? "dark" : ""}`}>
      <Head>
        <title>Lean Canvas</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-full w-full dark:bg-gray-800 dark:text-white">
        <form onSubmit={handleSubmit} className="grid gap-2 p-4 h-full w-full" xyz="fade small stagger-rev-1">
          <div id="branding" className="mx-4">
            <h1 className="font-bold text-3xl">Lean Canvas</h1>
          </div>
          <div id="controls" className="mx-4">
            <button className={"hover:bg-purple-500 bg-purple-800 text-white px-3 py-2 rounded font-bold transition-all"}>Print 🖨</button>
            <button className={"hover:bg-purple-500 bg-purple-800 mr-5 rounded-full w-10 h-10 transition-all"} onClick={handleDarkMode}>{darkMode ? "🌙" : "☀"}</button>
          </div>
          {
            map(canvasSegments, ({ id, fields }) => (
              <FieldSet key={id} id={id} fields={fields} />
            ))
          }
        </form>
      </main>
    </div>
  )
}

export default Home;
