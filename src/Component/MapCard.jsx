import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBBtn,
  MDBCardImage,
} from "mdb-react-ui-kit";

export default function MapCard(props) {
  return (
    <MDBCard id={props.id} className="text-center text-info w-75 ">
      {/* <MDBCardImage src={`https://maps.googleapis.com/maps/api/staticmap?center=${props.name}&zoom=13&size=400x300&key=YOUR_API_KEY`} alt={props.name} position='top' /> */}
      <MDBCardBody>
        <MDBCardTitle className="text-center mb-2 ">
          --{props.name}--
        </MDBCardTitle>
        <iframe
          src={`https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params=%7B%22ds2.name2%22:%22${props.name}%22%7D`}
          width="100%"
          height="400"
          frameBorder="0"
          style={{ border: "none" }}
          allowFullScreen
        ></iframe>
      </MDBCardBody>
    </MDBCard>
  );
}
