import React from 'react';
import styled from 'styled-components';
import { zone1DataState, zone2DataState } from '../../atoms/atom';
import Item from '../Item/Item';
import { useRecoilState } from 'recoil';

interface IDropZonePropType {
  zoneName: string;
}
//Zone 스타일 컴포넌트
const Zone = styled.div`
  width: 500px;
  height: 500px;
  border: 5px solid tomato;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  margin: 20px;
  overflow: auto;
`;
//forEach: 배열의 각 요소를 순회하며 작업을 수행하지만, 아무것도 반환하지 않습니다.
//즉, 순회하면서 화면에 JSX를 렌더링하는 데 사용할 수 없습니다.
//map: 배열의 각 요소를 변환하고 그 결과로 새로운 배열을 반환합니다. JSX를 반환하는 데 적합합니다.
function DropZone({ zoneName }: IDropZonePropType) {
  const [zone1Data, setZoneData1] = useRecoilState(zone1DataState);
  const [zone2Data, setZoneData2] = useRecoilState(zone2DataState);
  // Zone 컴포넌트에서 사용할 데이터
  const currentZoneData = zoneName === 'zone1' ? zone1Data : zone2Data;

  const findItemToAdd = (draggedItemId: string) => {
    return zoneName === 'zone1'
      ? zone2Data.find((item) => item.id === parseInt(draggedItemId))
      : zone1Data.find((item) => item.id === parseInt(draggedItemId));
  };

  //onDrop 로직
  function onHandleDrop(event: React.DragEvent<HTMLDivElement>) {
    // drop된 zone의 이름 확인
    console.log(`Dropped in ${zoneName}`);
    //getData로 dragStart때 setData로 저장한 id를 꺼내온다
    const draggedItemId = event.dataTransfer.getData('text/plain');
    const itemToAdd = findItemToAdd(draggedItemId);
    event.preventDefault();
    console.log(itemToAdd);
    //filter + slice 로직
    if (itemToAdd) {
      if (zoneName === 'zone1') {
        setZoneData1((current) => [...current, itemToAdd]);
        setZoneData2((current) => current.filter((item) => item.id !== parseInt(draggedItemId)));
      } else {
        setZoneData2((current) => [...current, itemToAdd]);
        setZoneData1((current) => current.filter((item) => item.id !== parseInt(draggedItemId)));
      }
      // const setCurrentZoneData = zoneName === 'zone1' ? setZoneData1 : setZoneData2;
      // const setOtherZoneData = zoneName === 'zone1' ? setZoneData2 : setZoneData1;

      // setCurrentZoneData((current) => [...current, itemToAdd]);
      // setOtherZoneData((current) => current.filter((item) => item.id !== parseInt(draggedItemId)));
    }
  }
  // 드래그 오버 핸들러
  // 드롭 가능한 영역에서 dragover 이벤트가 발생할 때 event.preventDefault()를 호출해야 드롭 이벤트가 발생
  function onHandleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault(); // 기본 동작 방지
  }
  return (
    <>
      <Zone onDrop={onHandleDrop} onDragOver={onHandleDragOver}>
        {currentZoneData.map((item) => {
          return <Item key={item.id} id={item.id} title={item.name} />;
        })}
      </Zone>
    </>
  );
}
// 블록 ({}): return 문이 필요함.
// 괄호 (()): return 문 없이도 JSX를 반환 가능.
export default DropZone;
