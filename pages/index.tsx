import { FieldSet } from 'components';
import { canvasSegments } from 'data';
import { capitalize, isEmpty, isEqual, kebabCase, map, reduce, words } from 'lodash';
import Head from 'next/head';
import * as React from 'react';

function Home() {
  const [darkMode, setDarkMode] = React.useState(true);
  const [title, setTitle] = React.useState("");

  const segments = map(canvasSegments, 'fields').flat().map(field => kebabCase(field.label));
  const [formValues, setFormValues] = React.useState(reduce(segments, (agg, value) => ({
    ...agg,
    [value]: ""
  }), {}));

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleDarkMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setTimeout(() => {
      setDarkMode(!darkMode)
    }, 300)

  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value }: { name: string, value: string } = e.target;

    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (isEmpty(files)) return;

    const file = files!.item(0);
    const uploadedJsonString = await file?.text();
    const uploadedJsonObj = JSON.parse(uploadedJsonString!) as { [key: string]: string };

    if (!isEqual(Object.keys(uploadedJsonObj), segments)) {
      console.error("Invalid file upload");
    };

    setFormValues(uploadedJsonObj);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    window.print();
  }

  if (!process.browser) return <></>;

  return (
    <div className={`min-h-screen grid place-items-center w-full ${darkMode ? "dark" : ""}`}>
      <Head>
        <title>Lean Canvas</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-full w-full dark:bg-gray-800 dark:text-white">
        <form onSubmit={handleSubmit} className="grid gap-2 p-4 h-full w-full" xyz="fade down stagger-1">
          <div id="branding" className="ml-4 xyz-in">
            <a title="Github" href="https://github.com/davidanitoiu/next-lean-canvas" target="_blank">
              <svg
                className="fill-current text-white mr-4 mt-2 hover:text-purple-500 transition-all"
                height="24" viewBox="0 0 16 16" version="1.1" width="24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
            <h1 className="font-bold text-3xl">Lean Canvas</h1>
          </div>
          <div id="controls" className="mx-4 w-full xyz-in pr-8">
            <a className={"hover:bg-purple-500 bg-purple-800 rounded-full w-10 h-10 transition-all btn"} download="lean-canvas.json" href={`data:application/octet-stream,${JSON.stringify(formValues, undefined, 2)}`} title="Export">⭳</a>
            <label className={"hover:bg-purple-500 bg-purple-800 rounded-full w-10 h-10 transition-all btn ml-2"} title="Import">⭱
              <input hidden type="file" onChange={handleUpload} title="Upload" />
            </label>
            <button className={"hover:bg-purple-500 bg-purple-800 rounded-full w-10 h-10 transition-all ml-2 btn"} title="Print">🖨</button>
            <button className={"hover:bg-purple-500 bg-purple-800 rounded-full w-10 h-10 transition-all ml-2 btn"} onClick={handleDarkMode} title={darkMode ? "Toggle Light" : "Toggle Dark"}>{darkMode ? "🌙" : "☀"}</button>
            <input className={"pl-2 ml-6  bg-gray-100 dark:bg-gray-700 placeholder-gray-700 dark:placeholder-gray-100 rounded"} name="title" value={title} onChange={handleTitleChange} placeholder="Your Company Name" />
          </div>
          {
            map(canvasSegments, ({ id, fields }) => (
              <FieldSet key={id} id={id} fields={fields} onChange={handleChange} values={formValues} />
            ))
          }
        </form>
        <div className="print m-4">
          <h1 className="font-black mb-4 self-center">Business Plan<span className="float-right font-thin">{title.toUpperCase()}</span></h1>
          <div id="tableOfContents">
            <h3 className="font-bold">Content</h3>
            {
              map(formValues, (formValue, key) => (
                <p key={key} className="ml-5">{words(key).map(word => capitalize(word)).join(" ")}</p>
              ))
            }
          </div>
          {
            map(formValues, (formValue, key) => (
              <article key={key} className="my-4">
                <h3 className="font-bold mb-2">{words(key).map(word => capitalize(word)).join(" ")}</h3>
                <p className="whitespace-pre-wrap">{formValue}</p>
              </article>
            ))
          }
        </div>
      </main>
    </div>
  )
}

export default Home;
