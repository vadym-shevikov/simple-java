import React, { useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { SchoolCreateRequest, SchoolType, schoolTypeLabels } from '../types/School';
import { schoolApi } from '../services/schoolApi';
import { ukrainianRegions } from '../constants';

interface SchoolFormProps {
  onSuccess: () => void;
}

export const SchoolForm: React.FC<SchoolFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<SchoolCreateRequest>({
    name: '',
    edrpou: '',
    region: '',
    type: SchoolType.GENERAL_SECONDARY,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Назва закладу є обов\'язковою';
    }

    if (!formData.edrpou.trim()) {
      newErrors.edrpou = 'ЄДРПОУ є обов\'язковим';
    } else if (!/^\d{8}$/.test(formData.edrpou)) {
      newErrors.edrpou = 'ЄДРПОУ має містити 8 цифр';
    }

    if (!formData.region) {
      newErrors.region = 'Область є обов\'язковою';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);
    setSuccess(false);

    try {
      await schoolApi.createSchool(formData);
      setSuccess(true);
      setFormData({
        name: '',
        edrpou: '',
        region: '',
        type: SchoolType.GENERAL_SECONDARY,
      });
      setErrors({});
      onSuccess();
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErrors({ general: error.response.data.message });
      } else {
        setErrors({ general: 'Помилка при створенні закладу' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {success && (
        <Alert variant="success" dismissible onClose={() => setSuccess(false)}>
          Заклад успішно створено!
        </Alert>
      )}
      
      {errors.general && (
        <Alert variant="danger" dismissible onClose={() => setErrors({ ...errors, general: '' })}>
          {errors.general}
        </Alert>
      )}

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Назва закладу</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              isInvalid={!!errors.name}
              placeholder="Введіть назву закладу"
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>ЄДРПОУ</Form.Label>
            <Form.Control
              type="text"
              value={formData.edrpou}
              onChange={(e) => setFormData({ ...formData, edrpou: e.target.value })}
              isInvalid={!!errors.edrpou}
              placeholder="00000000"
              maxLength={8}
            />
            <Form.Control.Feedback type="invalid">
              {errors.edrpou}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Область</Form.Label>
            <Form.Select
              value={formData.region}
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              isInvalid={!!errors.region}
            >
              <option value="">Оберіть область</option>
              {ukrainianRegions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.region}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Тип закладу</Form.Label>
            <Form.Select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as SchoolType })}
            >
              {Object.entries(schoolTypeLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? 'Створення...' : 'Створити заклад'}
      </Button>
    </Form>
  );
}; 