import React from 'react';
import Navbar from './components/Navbar';

type LandingProps = {}

export default function Landing({}: LandingProps) {
    

    
    return (
        <Navbar links={[{link : "google.com", label : "Test", links : [{link : "test.com", label : "Test header 1"}]},{link : "", label : "Test2", links : [{link : "test.com", label : "Test header 2"}]}, {link : "", label : "Test3", links : [{link : "test.com", label : "Test header 3"}, {link : "test.com", label : "Test header 4"}]}]} />  
    );
}