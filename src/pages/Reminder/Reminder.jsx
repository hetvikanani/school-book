import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Form, Input, DatePicker, TimePicker, Avatar } from 'antd';

const localizer = momentLocalizer(moment);

const Reminder = () => {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEventDetailsModalVisible, setIsEventDetailsModalVisible] = useState(false);
  const [events, setEvents] = useState([
    {
      title: 'Wow it works!!',
      allDay: true,
      start: moment().toDate(),
      end: moment().toDate(),
      resource: 'any',
      description: 'Nice.....',
    },
    {
      title: 'Lunch',
      start: moment().toDate(),
      end: moment().add(1, 'hour').toDate(),
      resource: 'any',
      description: 'Free time.....',
    },

    {
      title: 'Party Time',
      start: moment().add(3, 'hour').toDate(),
      end: moment().add(4, 'hour').toDate(),
      description: 'Party party eyyyy',
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [form] = Form.useForm();

  const showCreateModal = () => {
    setIsCreateModalVisible(true);
  };

  const handleCreateModalOk = () => {
    form.validateFields().then((values) => {
      const { title, description, date, startTime, endTime } = values;

      const startDateTime = moment(
        `${date.format('YYYY-MM-DD')} ${startTime.format('HH:mm')}`,
        'YYYY-MM-DD HH:mm',
      );
      const endDateTime = moment(
        `${date.format('YYYY-MM-DD')} ${endTime.format('HH:mm')}`,
        'YYYY-MM-DD HH:mm',
      );

      const newEvent = {
        title,
        start: startDateTime.toDate(),
        end: endDateTime.toDate(),
        description,
      };

      setEvents([...events, newEvent]);
      setIsCreateModalVisible(false);
      form.resetFields();
    });
  };

  const handleCreateModalCancel = () => {
    setIsCreateModalVisible(false);
    form.resetFields();
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsEventDetailsModalVisible(true);
  };

  const handleEventDetailsModalCancel = () => {
    setIsEventDetailsModalVisible(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <div className='flex flex-col items-center'>
        <div className='mb-4 z-10 mt-4'>
          <button
            type='button'
            className='z-10 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center'
            onClick={showCreateModal}
          >
            <PlusOutlined className='mr-1' />
            Create Task / Add Reminder
          </button>
        </div>
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 500 }}
        onSelectEvent={handleEventClick}
      />

      <Modal
        title='Create Task / Add Reminder'
        visible={isCreateModalVisible}
        onOk={handleCreateModalOk}
        onCancel={handleCreateModalCancel}
      >
        <Form form={form} layout='vertical'>
          <Form.Item
            name='title'
            label='Title'
            rules={[{ required: true, message: 'Please enter the title' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name='description' label='Description'>
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name='date'
            label='Date'
            rules={[{ required: true, message: 'Please select the date' }]}
          >
            <DatePicker className='w-full' />
          </Form.Item>
          <Form.Item
            name='startTime'
            label='Start Time'
            rules={[{ required: true, message: 'Please select the start time' }]}
          >
            <TimePicker className='w-full' use12Hours format='h:mm a' />
          </Form.Item>
          <Form.Item
            name='endTime'
            label='End Time'
            rules={[{ required: true, message: 'Please select the end time' }]}
          >
            <TimePicker className='w-full' use12Hours format='h:mm a' />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title='Event Details'
        visible={isEventDetailsModalVisible && selectedEvent !== null}
        onCancel={handleEventDetailsModalCancel}
        footer={null}
      >
        <div className='flex items-center mb-4'>
          <Avatar size={64} src={selectedEvent?.userAvatar} />
          <span className='ml-2'>{selectedEvent?.userName}</span>
        </div>
        <p>
          <strong>Title: </strong>
          {selectedEvent?.title}
        </p>
        <p>
          <strong>Description: </strong>
          {selectedEvent?.description}
        </p>
        <p>
          <strong>Start Time: </strong>
          {moment(selectedEvent?.start).format('YYYY-MM-DD HH:mm')}
        </p>
        <p>
          <strong>End Time: </strong>
          {moment(selectedEvent?.end).format('YYYY-MM-DD HH:mm')}
        </p>
      </Modal>
    </>
  );
};

export default Reminder;
