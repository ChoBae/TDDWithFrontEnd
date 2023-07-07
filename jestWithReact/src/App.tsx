import normalize from 'emotion-normalize';
import { Global, css } from '@emotion/react';
import NumberPad from './NumberPad';

export default function App() {
  return (
    <>
      <Global
        styles={css`
          ${normalize}
          h1, h2, h3, h4, h5, h6 {
            font-size: 2em;
            font-weight: normal;
            margin: 0; /* or ‘0 0 1em’ if you’re so inclined */
          }

          body {
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            max-width: 1000px;
            margin: 0 auto;
            padding: 2em;
            align-items: center;
            justify-content: center;
          }
        `}
      />
      <h1>보안 키패드</h1>
      <NumberPad />
    </>
  );
}
