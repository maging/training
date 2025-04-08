import React from 'react';
import { useState } from "react";
import AgntDataEntry from '../pages/AgntDataEntry';

function Home() {
    const tabData = [{ id: 1, content: "정보입력" },
                     { id: 2, content: "테스트" }
    ];

    const [activeTab, setActiveTab] = useState(tabData[0].id);

    const tabClickHandler = (tabId: number): void => {
        // 테스트 진행단계 진행여부 가능여부 체크
        setActiveTab(tabId);
    };
    
    return (
        <>
        <ul>
            {
            tabData.map((tab) => {
                return (
                    <li key={tab.id}
                        onClick={() => tabClickHandler(tab.id)}
                    >{tab.content}
                    </li>
                );
            })
            }
        </ul>
        {activeTab === 1 && <AgntDataEntry />}
        </>
    );
  }
  
  export default Home;