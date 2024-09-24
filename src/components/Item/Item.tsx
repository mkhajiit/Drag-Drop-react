import styled from 'styled-components';

interface ItemProps {
  id: number;
  title: string;
}

const DragItem = styled.div`
  padding: 10px;
  background-color: #3498db;
  color: white;
  text-align: center;
  cursor: grab;
`;

// 구조분해 할당하는 매개변수의 타입은 객체형태로 지정해야함
function Item({ id, title }: ItemProps) {
  //onDragStart 핸들러
  function onHandleDragStart(event: React.DragEvent<HTMLDivElement>) {
    event.dataTransfer.setData('text/plain', id.toString());
    event.currentTarget.style.opacity = '0.5';
  }
  //onDragEnd 핸들러
  function onHandleDragEnd(event: React.DragEvent<HTMLDivElement>) {
    event.currentTarget.style.opacity = '1';
  }
  return (
    <>
      <DragItem draggable onDragStart={onHandleDragStart} onDragEnd={onHandleDragEnd}>
        {title}
      </DragItem>
    </>
  );
}

export default Item;
