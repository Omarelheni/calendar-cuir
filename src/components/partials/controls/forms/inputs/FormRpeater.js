import React, { useRef } from 'react'
import _ from 'lodash'
import { Button, Col, Row } from 'react-bootstrap'
import { FieldArray } from 'formik'
import { FastField } from "formik"
import { FORM_COMPONENT, DEFAULT_TYPE } from "./../types/inputTypes"
const FormRepeater = (props) => {
  const addRef = useRef()
  const regex = new RegExp('[0-9]')
  const { label, min = 0, field, fields, form, showDeleteButton=true, showAddButton=true, max = 50 } = props


  console.log('min ==>',min)

  const arrayFieldValues = React.useMemo(() => {
    return Array.from(_.get(form.values, field.name, []))
    // eslint-disable-next-line
  }, [form.values, field.name])


  const initialSnapshot = React.useMemo(() => {
    const snapshot = {}
    fields.forEach(field => {
      _.set(snapshot, field.name.substring(field.name.lastIndexOf('[]') + 1), _.get(field, 'initialValue', ''))
    })
    return snapshot
    // eslint-disable-next-line
  }, [fields])


  const renderField = ({ name, arrayName, component, ...props }) => (
    <FastField
      name={ arrayName + name }
      component={FORM_COMPONENT[component] || DEFAULT_TYPE }
      { ...props }
    />  )


  const renderFields = (arrayName, fields) => (<>    {fields.map((input, i) => {
      const {  size=12,validation, ...field } = input
      const {hideOn} = field;
      let field2
      if (!_.isEmpty(hideOn)) {
       field2 ={...field,hideOn:`${arrayName}${hideOn}`}
      }
      else {
        field2={...field}
      }
      return (
        <Col lg={size}>
          {renderField({
            ...field2,
            arrayName
          }) }
        </Col>
      )
    })}
  </>)

  console.log(field.name)
  return (
    <div className={'pb-3'}>      
    
    <FieldArray
        name={field.name}
        render={arrayHelpers => {
          if (_.isArray(arrayFieldValues) && arrayFieldValues.length < min) {
            for (let i = 0; i < min; i++) {
              arrayHelpers.push(initialSnapshot)
            }
          }
          return (
            <div>   
              <hr></hr>
                 <div className='d-flex flex-column'>
                    <h5>
                        {label}
                        </h5>
                        { showAddButton &&     <Button
                className="btn btn-sm btn-primary align-self-start flex-grow-0"
                disabled={_.isArray(arrayFieldValues) && arrayFieldValues.length >= max}
                ref={addRef}
                onClick={() => _.isArray(arrayFieldValues) && arrayFieldValues.length < max && arrayHelpers.push(initialSnapshot)}
              >
                +
              </Button>                     }
    
                 </div>
              
              {( _.isArray(arrayFieldValues)) && arrayFieldValues.map((__, index) => (
                <div className={index === arrayFieldValues.length - 1 ? 'mt-5' : 'mt-5 border-bottom'} key={index}> 
                      <Row>                    
                        <Col lg={ showDeleteButton ? 11 : 12}>                      
                        <Row className='d-flex align-items-end'>                        
                        { renderFields(`${field.name}.${index}.`, fields) }
                      </Row>                    
                      </Col>                    
                      {showDeleteButton && <Col lg='1' className={ (regex.test(field.name) ? '': 'border-left ') + 'd-flex align-items-center justify-content-center'}>
                        <Button
                        disabled={min > 0 ? _.isArray(arrayFieldValues) && arrayFieldValues.length === min : false}
                        className='btn btn-sm  btn-danger btn-icon'
                        onClick={() => arrayHelpers.remove(index)}
                      >                        
                      <i className='fas fa-trash-alt' />                      
                      </Button>                    
                      </Col> }
                  </Row>                
                  </div>              
                  ))}
            </div>          
            )
        }}
      />    </div>  )
}
export default FormRepeater

