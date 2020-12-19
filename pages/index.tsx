import { FieldSet } from 'components';
import { canvasSegments } from 'data';
import { map } from 'lodash';
import Head from 'next/head';
import * as React from 'react';

function Home() {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataEntries = new FormData(e.currentTarget).entries();
    const formValues = Object.fromEntries(formDataEntries);

    console.dir(formValues);

  }

  return (
    <div className={"min-h-screen grid place-items-center w-full"}>
      <Head>
        <title>Lean Canvas</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form onSubmit={handleSubmit}>
          <button>Submit</button>
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
