import React, { useState, useEffect } from 'react';
import { Table, Form, Row, Col, Button, Modal } from 'react-bootstrap';
import { School, schoolTypeLabels } from '../types/School';
import { schoolApi } from '../services/schoolApi';
import { ukrainianRegions } from '../constants';

interface SchoolListProps {
  refresh: boolean;
  onRefresh: () => void;
}

export const SchoolList: React.FC<SchoolListProps> = ({ refresh, onRefresh }) => {
  const [schools, setSchools] = useState<School[]>([]);
  const [filters, setFilters] = useState({
    region: '',
    type: '',
    isActive: '',
  });
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  useEffect(() => {
    loadSchools();
  }, [filters, refresh]);

  const loadSchools = async () => {
    setLoading(true);
    try {
      const filterParams: any = {};
      if (filters.region) filterParams.region = filters.region;
      if (filters.type) filterParams.type = filters.type;
      if (filters.isActive !== '') filterParams.isActive = filters.isActive === 'true';
      
      const data = await schoolApi.getSchools(filterParams);
      setSchools(data);
    } catch (error) {
      console.error('Error loading schools:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async () => {
    if (!selectedSchool) return;
    
    try {
      await schoolApi.deactivateSchool(selectedSchool.id);
      setShowConfirm(false);
      setSelectedSchool(null);
      onRefresh();
    } catch (error) {
      console.error('Error deactivating school:', error);
    }
  };

  const confirmDeactivate = (school: School) => {
    setSelectedSchool(school);
    setShowConfirm(true);
  };

  return (
    <>
      <Row className="mb-4">
        <Col md={3}>
          <Form.Group>
            <Form.Label>Область</Form.Label>
            <Form.Select
              value={filters.region}
              onChange={(e) => setFilters({ ...filters, region: e.target.value })}
            >
              <option value="">Всі області</option>
              {ukrainianRegions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Тип закладу</Form.Label>
            <Form.Select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">Всі типи</option>
              {Object.entries(schoolTypeLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Статус</Form.Label>
            <Form.Select
              value={filters.isActive}
              onChange={(e) => setFilters({ ...filters, isActive: e.target.value })}
            >
              <option value="">Всі</option>
              <option value="true">Активні</option>
              <option value="false">Деактивовані</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center">Завантаження...</div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Назва</th>
              <th>ЄДРПОУ</th>
              <th>Область</th>
              <th>Тип</th>
              <th>Статус</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school) => (
              <tr key={school.id}>
                <td>{school.id}</td>
                <td>{school.name}</td>
                <td>{school.edrpou}</td>
                <td>{school.region}</td>
                <td>{schoolTypeLabels[school.type]}</td>
                <td>
                  <span className={`badge ${school.isActive ? 'bg-success' : 'bg-secondary'}`}>
                    {school.isActive ? 'Активний' : 'Деактивований'}
                  </span>
                </td>
                <td>
                  {school.isActive && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => confirmDeactivate(school)}
                    >
                      Деактивувати
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Підтвердження деактивації</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Ви впевнені, що хочете деактивувати заклад "{selectedSchool?.name}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Скасувати
          </Button>
          <Button variant="danger" onClick={handleDeactivate}>
            Деактивувати
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}; 