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
