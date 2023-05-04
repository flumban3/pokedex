import "./footer.css";

function Footer({ next, previous, prevPage, nextPage }) {
  return (
    <div className='container'>
      {prevPage ? (
        <button className='previous' onClick={previous}>
          Previous
        </button>
      ) : null}
      {nextPage ? (
        <button className='next' onClick={next}>
          Next
        </button>
      ) : null}
    </div>
  );
}

export default Footer;
