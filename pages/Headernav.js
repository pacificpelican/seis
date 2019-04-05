//  seis copyright 2017-2019
//  Headernav.js
//  via apple-picker, mlBench, and danmckeown.info #5
export default () => (
  <header id="topheader">
    <nav id="topnav">
      <ul id="navlist">
        <li id="website">
          <a href="../../../..">SEIS</a> | <a href="../../About">About</a>
        </li>
        <li>
          <a href="https://bitbucket.org/pacificpelican/seis/src/master/">
            Bitbucket
          </a>
        </li>
      </ul>
    </nav>
    <style jsx>{`
      header#topheader {
        font-family: "Inconsolata", "Anonymous Pro", "Hack", Menlo, monospace;
      }
      a,
      a:visited {
        color: black;
      }
    `}</style>
  </header>
);
