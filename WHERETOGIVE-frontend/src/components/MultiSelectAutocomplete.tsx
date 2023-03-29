import React from 'react';
import Select from 'react-select';

const MultiSelectAutocomplete = (props: any) => {
  interface Category {
    value: string;
    label: string;
  }

  function convertTagsToCategories(tags: any) {
    let categories: Category[] = [];
    for (let i = 0; i < tags.length; i++) {
      categories.push({ value: tags[i], label: tags[i] });
    }
    return categories;
  }

  return (
    <div>
      <Select
        isMulti
        name="colors"
        options={convertTagsToCategories(props.tags)}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={(selectedOptions: any) =>
          props.setSelectedTags(selectedOptions)
        } // Update the state variable when the selection changes
      />
    </div>
  );
};

export default MultiSelectAutocomplete;
