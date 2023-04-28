import React, { useState } from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import Bookmark from './Bookmark';
import Homepage from './HomePage';
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {
  const [verticalActive, setVerticalActive] = useState('tab1');
  const navigate = useNavigate();

  const handleVerticalClick = (value) => {
    if (value === verticalActive) {
      return;
    }

    setVerticalActive(value);
  };

  const handleLogout=()=>{
      navigate("/");
  }

  return (
    <>
      
        <MDBCol size='2' className='fixed-column'>
          <MDBTabs pills className='flex-column text-center' style={{backgroundColor:"gray" , height:"100vh"}}>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab1')} active={verticalActive === 'tab1'}>
                Home Page
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab2')} active={verticalActive === 'tab2'}>
                Bookmarked restaruants
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleLogout()} active={verticalActive === 'tab3'}>
                LogOut
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
        </MDBCol>


        <MDBCol size='10' className='scrollable-column'>
          <MDBTabsContent>
            <MDBTabsPane show={verticalActive === 'tab1'}><Homepage/></MDBTabsPane>
            <MDBTabsPane show={verticalActive === 'tab2'}><Bookmark/></MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
      
    </>
  );
}