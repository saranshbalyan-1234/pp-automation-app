import React from 'react'
import { Form, Input, Select } from 'antd'
export default function Parameter({ currentEvent }) {
  const getParams = (param) => {
    if (param.options)
      return (
        <Select style={{ minWidth: '160px' }} showSearch>
          {param.options.map((el, i) => {
            return (
              <Select.Option value={el} key={i}>
                {el}
              </Select.Option>
            )
          })}
        </Select>
      )
    else return <Input name={param.name} showCount maxLength={100} />
  }

  return (
    <>
      {currentEvent.testParameters?.map((param) => {
        return (
          <Form.Item
            label={<div className="star">{param.name}</div>}
            key={`key_${param.name}`}
          >
            <Form.Item
              name={`${param.name}_type`}
              rules={[
                {
                  required: true,
                  message: 'Please Select Parameter Type',
                },
              ]}
              style={{
                display: 'inline-block',
                width: 'calc(30% - 8px)',
              }}
            >
              <Select>
                <Select.Option value="Static">Static</Select.Option>
                <Select.Option value="Dynamic">Dynamic</Select.Option>
                <Select.Option value="Environment">Environment</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={param.name}
              rules={[
                {
                  required: true,
                  message: 'Please input Parameter!',
                },
              ]}
              style={{
                display: 'inline-block',
                width: 'calc(70% - 8px)',
                margin: '0 8px',
              }}
            >
              {getParams(param)}
            </Form.Item>
          </Form.Item>
        )
      })}
    </>
  )
}
