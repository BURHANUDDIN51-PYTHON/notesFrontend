import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { EditNote } from '../components/index.js'
import { Loader} from '../components/index.js'

const EditPage = () => {
  const slug = useParams()
  const note = useSelector(state => state.notes.notes[0]?.find(note => note.slug === slug.slug))
  
  if (!note) {
    return <Loader />
  }
  return  (
    note && (
      <EditNote note={note} slug={slug}/>
    )
  )
}

export default EditPage