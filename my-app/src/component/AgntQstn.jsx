import React from 'react';
import { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';

function AgntQstn({useYn, modeYn, items, setData}) {
  const ADD_MAX_COUNT = 10;
  const [qstnChoice, setQstnChoice] = useState(useYn);                  // 질문 사용유무
  const [qstnItems, setQstnItems] = useState(items);                    // 질문 리스트
  const [isDisabled, setIsDisabled] = useState([false,false,false]);    // 질문입력폼 상태(질문,추가버튼,삭제버튼)
  const nextID = useRef(items.length);                                  // 질문폼 Index

  useEffect(() => {
    setData(qstnItems);
  }, [qstnItems]);

  // 사용유무 체크
  function useYnHandler(e) {
    setQstnChoice(e.target.value);

    if (e.target.value === 'N') {
      setIsDisabled([true,true,true]);
    } else {
      setIsDisabled([false,false,false]);
    }
  };
  
  // 추가
  function qstnAddHandler() {
    const input = { idx: nextID.current,
                    qstnNm: '',
                    useYn: 'Y'
    };

    setQstnItems([...qstnItems, input]);
    nextID.current += 1;

    setBtnDisabled();
  };

  // 삭제
  function qstnDelHandler(idx) {
    /*
      TODO : backEnd 처리에 따라 분리
      1. 삭제후 전체 등록인경우 데이터 필터
      2. 상태값 변경인경우 해당 사용유무만 변경 => 화면은 사용유무에 따라 display
    */
    //setQstnItems(qstnItems.filter(item => item.idx !== idx)); // 1. 삭제후 전체 등록인경우 데이터 필터
    
    setQstnItems(qstnItems.map((item) => item.idx === idx ? {...item, 'useYn': 'N'} : item)); // 2. 상태값 변경인경우 해당 사용유무만 변경 => 화면은 사용유무에 따라 display
    nextID.current -= 1;
    //테스트
    setBtnDisabled();
  };

  // 입력데이터 바인딩
  function qstnDataBindHandler(e, idx) {
    console.log("qstnDataBindHandler", e,idx);
    if (e.target.value.length > 15) {
      e.target.value = e.target.value.slice(0, 15);
    }
    setQstnItems(qstnItems.map((item) => item.idx === idx ? {...item, 'qstnNm': e.target.value, 'qstnNmLen': e.target.value.length} : item));
    //let inputLen = e.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length;
    //setInputCount(e.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length);
    //setQstnItems(qstnItems.map((item) => item.idx === idx ? {...item, 'qstnNm': e.target.value, 'qstnNmLen': inputLen} : item));
  };

  // 입력값 체크
  

  // 추가,삭제버튼 활성화 여부
  function setBtnDisabled() {
    const cpIsDisabled = [...isDisabled];

    // 추가버튼 활성화 여부(30개까지지)
    if (nextID.current === ADD_MAX_COUNT) {
      cpIsDisabled[1] = true;
    } else {
      cpIsDisabled[1] = false;
      // 삭제버튼 활성화 여부
      if (nextID.current < 3) {
        cpIsDisabled[2] = true;
      } else {
        cpIsDisabled[2] = false;
      }
    }
    
    setIsDisabled([...cpIsDisabled]);  // 변경된 복사값
  };

  return (
    <div>
        <label>
          <input
              type="radio"
              value='N'
              onChange={useYnHandler}
              checked={qstnChoice === 'N'}
              />
                미사용
        </label>
        <label>
            <input
              type="radio"
              value='Y'
              onChange={useYnHandler}
              checked={qstnChoice === 'Y'}
              />
                사용
        </label>
        
        {qstnItems.map((item, index) => (
          <>
            {item.useYn === 'Y' &&
              <div key={index}>
                  <input type="input" disabled={isDisabled[0]} value={item.qstnNm} onBulr onChange={e => qstnDataBindHandler(e, item.idx)} maxLength="15"/>
                  글자수 {item.qstnNmLen} / 15
                {(index === 0 || nextID === 4) &&
                  <button disabled={isDisabled[1]} onClick={qstnAddHandler}>+ 추가</button>
                }
                {index > 0 || item[index - 1] ? 
                <button disabled={index < 3 ? true : isDisabled[2]} onClick={() => qstnDelHandler(item.idx)}> - 삭제</button>
                : ''}
                <br/>
              </div>
            }
          </>
        ))}
    </div>
  );
}

AgntQstn.propTypes = {
  useYn: PropTypes.string,
  modeYn: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      idx: PropTypes.number,
      qstnNm: PropTypes.string,
      useYn: PropTypes.string
    }),
  )
}

AgntQstn.defaultProps = {
  useYn: 'N',
  modeYn: false,
  items: []
}

export default AgntQstn;