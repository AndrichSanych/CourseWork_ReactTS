import React, { useState } from 'react';
import type { UploadFile } from 'antd';
import { Image } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const reorder = (list: UploadFile[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const CreateAdvert: React.FC = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);

  const props = {
    showUploadList: false,
    name: 'file',
    multiple: true,
    async onChange(info: any) {
      const { status } = info.file;
      if (status !== 'uploading') {
        for (let index = 0; index < info.fileList.length; index++) {
          if (!info.fileList[index].preview && !info.fileList[index].url) {
            info.fileList[index].preview = await getBase64(info.fileList[index].originFileObj as File)
          }
        }
        setFiles(info.fileList);
      }
    },
    beforeUpload() { return false }
  };

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    setFiles(reorder(
      files,
      result.source.index,
      result.destination.index
    ));


  }
  const grid = 8;
  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: 15,
    margin: `5px`,
    // change background colour if dragging
    background: isDragging ? 'darkgrey' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver: boolean) => ({
    "borderRadius": "10px",
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    //"flexWrap": "wrap",
    padding: 15,
    overflow: 'auto',
  });


  return (
    <div className='d-flex flex-column gap-2 border border-1 rounded-2 p-2'>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Натисніть або перетягніть файл у цю область, щоб завантажити</p>
        <p className="ant-upload-hint">
        Підтримка одиночного або масового завантаження. Категорично заборонено завантажувати дані компанії чи інше
        заборонені файли.
        </p>
      </Dragger>
      {files.length>0&&
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {files.map((item, index) => (
                <Draggable key={item.uid} draggableId={item.uid} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <div className='border border-1 rounded-2 p-1'>
                        <Image
                          className='rounded-2'
                          alt={item.uid}
                          src={item.url || (item.preview as string)}
                          preview={true}
                          width={250}
                          style={{objectFit:"cover",aspectRatio:"16/10"}}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>}
    </div>
  )
}

export default CreateAdvert
