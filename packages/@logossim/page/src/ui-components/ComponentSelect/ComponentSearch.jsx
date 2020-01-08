import React, { useState } from 'react';
import styled from 'styled-components';

import { Header, Content, IconButton } from './ComponentLayout';
import ComponentGroup from './ComponentGroup';
import Close from '../Icons/Close';

const SearchBar = styled.input`
  flex-grow: 1;

  padding: 10px;
  font-size: 1.5em;

  border-radius: 25px;
  border: 1px solid gray;

  ::placeholder {
    font-weight: 300;
    color: #cfcfcf;
  }
`;

const ComponentSearch = ({
  groups,
  handleComponentSelect,
  handleClose,
}) => {
  const [filteredGroups, setFilteredGroups] = useState(groups);
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = value => {
    setSearchText(value);

    if (!value) {
      setFilteredGroups(groups);
      return;
    }

    const like = new RegExp(`${value}.*`, 'i');

    const newFilteredGroups = groups
      .map(group => {
        const hasAnyMatchingComponent = group.components.some(
          component => component.name.match(like),
        );

        if (hasAnyMatchingComponent)
          return {
            ...group,
            components: group.components.filter(component =>
              component.name.match(like),
            ),
          };
        return null;
      })
      .filter(group => group != null);

    setFilteredGroups(newFilteredGroups);
  };

  const handleKeyDown = key => {
    if (key === 'Escape') {
      setSearchText('');
      setFilteredGroups(groups);
    }

    if (
      key === 'Enter' &&
      searchText &&
      filteredGroups.length === 1 &&
      filteredGroups[0].components.length === 1
    ) {
      handleComponentSelect(filteredGroups[0].components[0]);
    }
  };

  return (
    <>
      <Header>
        <SearchBar
          autoFocus
          placeholder="Search components..."
          value={searchText}
          onChange={({ target: { value } }) =>
            handleSearchChange(value)
          }
          onKeyDown={({ key }) => handleKeyDown(key)}
        />
        <IconButton last onClick={handleClose}>
          <Close />
        </IconButton>
      </Header>

      <Content>
        {filteredGroups.map(({ name, components }) => (
          <ComponentGroup
            name={name}
            components={components}
            handleComponentSelect={handleComponentSelect}
            key={name}
          />
        ))}
      </Content>
    </>
  );
};

export default ComponentSearch;