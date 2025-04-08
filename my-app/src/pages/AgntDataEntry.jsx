import React from 'react';
import {useState} from 'react';

import PropTypes from 'prop-types';

import AgntQstn from '../component/AgntQstn';

function AgntDataEntry() {
    const qstnList = [{idx : 0 , qstnNm : '에이전트에 표시될 예시질문 1', useYn: 'Y'},
                      {idx : 1 , qstnNm : '에이전트에 표시될 예시질문 2', useYn: 'Y'},
                      {idx : 2 , qstnNm : '에이전트에 표시될 예시질문 3', useYn: 'Y'}
                      
    ];
    
    const [data, setData] = useState([]);

    function onData(name) {
        setData(name);
    }

    // 임시저장
    function tempSaveHandler() {
        console.log('임시저장');
        console.log(data);
        
        
    };

    // 다음단계
    function nextStageDelHandler() {

    };

  return (
    <>
    <div>
        <label>정보입력</label>

        <AgntQstn useYn='Y' modeYn='N' items={qstnList} setData={onData} />
    </div>
    <br/>
    <button disabled={false} onClick={tempSaveHandler}>임시저장</button>
    <button disabled={false} onClick={nextStageDelHandler}>다음단계</button>
    </>
  );
}

export default AgntDataEntry;