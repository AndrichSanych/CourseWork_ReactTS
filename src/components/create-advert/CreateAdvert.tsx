import React, { useState } from 'react';
import type { GetProp, UploadFile, UploadProps } from 'antd';
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
        info.fileList.forEach(async (x:UploadFile)=>
          {
            if(!x.preview && !x.url)
              x.preview = await getBase64(x.originFileObj as File)
          });
        //info.file.preview = await getBase64(info.file)
        setFiles(info.fileList);
      }
      
    },

    beforeUpload() {
     
      return false
    }
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
  const getItemStyle = (isDragging:boolean, draggableStyle:any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: 15,
    margin: `5px`,
    // change background colour if dragging
    background: isDragging ? 'darkgrey' : 'grey',
  
    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver:boolean) => ({
    "border-radius": "10px",
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    "flex-wrap": "wrap",
    padding: 15,
    overflow: 'hidden',
  });


  return (
    <div className='d-flex flex-column gap-2'>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from uploading company data or other
          banned files.
        </p>
      </Dragger>
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
                          className=' rounded-2'
                          alt={item.uid}
                          src={item.url || (item.preview as string)}
                          preview={true}
                          width={150}
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
      </DragDropContext>
    </div>
  )
}

export default CreateAdvert
