import React from 'react';
import ReactLoading from 'react-loading';

const Example = () => (
    <div style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height: "100%"
    }}>
        <ReactLoading type={"spin"} color={"blue"} height={'10%'} width={'10%'} />
    </div>
);

export default Example;