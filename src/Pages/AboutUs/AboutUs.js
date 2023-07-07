import React from 'react';
import OurStory from './OurStory/OurStory';
import OurPromise from './OurPromise/OurPromise';

const AboutUs = () => {
    return (
        <div className='w-11/12 mx-auto my-6'>
            <OurStory />
            <OurPromise />
        </div>
    );
};

export default AboutUs;