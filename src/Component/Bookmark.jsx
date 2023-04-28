import React from "react";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle } from "mdb-react-ui-kit";
import { useCart } from "react-use-cart";

function Bookmark() {
  const { items, isEmpty, removeItem } = useCart();
  // console.log("item is " , items);
  if (isEmpty)
    return <h2 className="text-center mt-5">Your Bookmark is Empty</h2>;
  return (
    <>
      <h3 className="text-center m-5 font-monospace bg-info text-white">---Bookmarked restaruants---</h3>
      <div className="mt-5 ms-5 font-monospace">
        {items.map((item) => {
          return (
            <MDBCard className="text-center text-info w-75 mb-5 ">
              <MDBCardBody>
                <MDBCardTitle className="text-center mb-2 fw-bold ">
                  --{item.name}--
                </MDBCardTitle>
                <iframe
                  src={`https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params=%7B%22ds2.name2%22:%22${item.name}%22%7D`}
                  width="100%"
                  height="400"
                  frameBorder="0"
                  style={{ border: "none" }}
                  allowFullScreen
                ></iframe>
                <MDBBtn
                  rounded
                  className="mx-2"
                  color="danger"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          );
        })}
      </div>
    </>
  );
}

export default Bookmark;
