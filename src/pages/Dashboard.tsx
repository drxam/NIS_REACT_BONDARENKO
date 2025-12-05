import React, { useState, useEffect, useMemo } from 'react';
import { Box, Container, Typography, Select, MenuItem, FormControl, InputLabel, Button, Skeleton } from '@mui/material';
import { PetCard } from '../components/PetCard/PetCard';
import { EventLog } from '../components/EventLog/EventLog';
import type { Pet } from '../components/PetCard/types';
import petsDataRaw from '../data/pets.json';

const petsData: Pet[] = petsDataRaw as Pet[];
import '../styles/global.scss';

export const Dashboard: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecies, setSelectedSpecies] = useState<string>('all');
  const [eventLogOpen, setEventLogOpen] = useState(false);

  useEffect(() => {
    const loadPets = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setPets(petsData);
      setLoading(false);
    };

    loadPets();
  }, []);

  const speciesList = useMemo(() => {
    const species = new Set(pets.map((pet) => pet.species));
    return Array.from(species);
  }, [pets]);

  const filteredPets = useMemo(() => {
    if (selectedSpecies === 'all') {
      return pets;
    }
    return pets.filter((pet) => pet.species === selectedSpecies);
  }, [pets, selectedSpecies]);

  return (
    <Container maxWidth="xl" className="dashboard-container">
      <Box className="dashboard-header">
        <Typography variant="h3" component="h1" className="dashboard-title">
          Мой крутой зоопарк
        </Typography>
        <Button variant="contained" onClick={() => setEventLogOpen(true)}>
          Показать лог событий
        </Button>
      </Box>

      <Box className="dashboard-filters">
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Фильтр по виду</InputLabel>
          <Select
            value={selectedSpecies}
            label="Фильтр по виду"
            onChange={(e) => setSelectedSpecies(e.target.value)}
          >
            <MenuItem value="all">Все виды</MenuItem>
            {speciesList.map((species) => (
              <MenuItem key={species} value={species}>
                {species}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box className="dashboard-grid">
        {loading ? (
          <>
            {[...Array(6)].map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width="100%"
                height={400}
                sx={{ borderRadius: 2 }}
              />
            ))}
          </>
        ) : (
          filteredPets.map((pet) => <PetCard key={pet.id} pet={pet} />)
        )}
      </Box>

      <EventLog open={eventLogOpen} onClose={() => setEventLogOpen(false)} />
    </Container>
  );
};

