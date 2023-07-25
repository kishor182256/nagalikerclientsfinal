 import React from 'react'
 import SearchIcon from '@material-ui/icons/Search';
 import TextField from '@material-ui/core/TextField';
import Button from './Buttons';
import { tableStyles } from '../../Styles/AddNewDocStyle';

 

const Options = () => {
  const tableclasses = tableStyles(); 
  return (
     <div className={tableclasses.filterSearch}>
    <div>
      <Button className={tableclasses.filterButton1}>Options</Button>
      <Button className={tableclasses.filterButton2}>Export</Button>
      <Button className={tableclasses.filterButton2}>Edit</Button>
      <Button className={tableclasses.filterButton2}>Delete</Button>
      <Button className={tableclasses.filterButton3}>Access right</Button>
    </div>

    <div className={tableclasses.filterButtonHori}>
      <Button className={tableclasses.filterButtonh1}>Edit</Button>
      <Button className={tableclasses.filterButtonh2}>Delete</Button>
      <Button className={tableclasses.filterButtonh3}>Preview</Button>
      <Button className={tableclasses.filterButtonh4}>Access right</Button>
    </div>

    <div className={tableclasses.searchContainer}>
      <SearchIcon    className={tableclasses.searchIcon} />
      <TextField
        className={tableclasses.searchField}
         displayEmpty 
        placeholder="Search"
         defaultValue="Search" 
        variant="standard"
        size="small"
      />
    </div>
    </div>
  )
}

export default Options 