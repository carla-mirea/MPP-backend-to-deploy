import { Response } from 'express';
import { monitors } from '../dataStore';

// Import the functions you want to test
const {
    addMonitor,
    getMonitors,
    getMonitorById,
    updateMonitor,
    deleteMonitor
  } = require('../controller/monitorsController');

  const mockRequest = (
    body: { id: number; brand: string; refreshRate: string; pictureUrl: string; },
    params?: { id: string }
  ) => ({
    body,
    params // Include the params object in the mock request
  });
  
  const mockResponse = (): Response => {
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    return res as Response;
  };

  describe('getMonitors function', () => {
    test('should return all monitors', () => {
      // Create mock request
      const req = mockRequest({
          id: 0,
          brand: '',
          refreshRate: '',
          pictureUrl: ''
      });
  
      // Create mock response
      const res = mockResponse();
  
      // Call the getMonitors function
      getMonitors(req, res);
  
      // Expectations
      // Expect json to be called with the monitors array
      expect(res.json).toHaveBeenCalledWith(monitors);
    });
});

  describe('getMonitorById function', () => {
    test('should return a specific monitor by ID', () => {

        const GotMonitorData = {
            id: 1,
            brand: 'Samsung',
            refreshRate: '75Hz',
            pictureUrl: 'monitor1.jpg'
          };

      // Define the monitor ID to be retrieved
      const monitorId = '1';
  
      // Create mock request with the monitor ID
      const req = mockRequest({
          id: 1,
          brand: 'Samsung',
          refreshRate: '75Hz',
          pictureUrl: 'monitor1.jpg'
      }, { id: monitorId });
  
      // Create mock response
      const res = mockResponse();
  
      // Call the getMonitorById function
      getMonitorById(req, res);
  
      // Expectations
      // Expect json to be called with the specific monitor data
      expect(res.json).toHaveBeenCalledWith(GotMonitorData);
    });
});
  
  describe('addMonitor function', () => {
    test('should add a new monitor', () => {
      // Define the new monitor data
      const newMonitorData = {
        id: 1,
        brand: 'Brand 1',
        refreshRate: '60 Hz',
        pictureUrl: 'url1'
      };
  
      // Create mock request with the new monitor data
      const req = mockRequest(newMonitorData);
  
      // Create mock response
      const res = mockResponse();
  
      // Call the addMonitor function
      addMonitor(req, res);
  
      // Expectations
      // Expect status to be called with 201
      expect(res.status).toHaveBeenCalledWith(201);
      // Expect json to be called with the new monitor data
      expect(res.json).toHaveBeenCalledWith(newMonitorData);
    });
  });

  describe('deleteMonitor function', () => {
    test('should delete a monitor by ID', () => {
      // Define the ID of the monitor to delete
      const monitorIdToDelete = '1';
  
      // Create mock request with the monitor ID as a parameter
      const req = mockRequest(
        { id: 1, brand: 'Brand 1', refreshRate: '60 Hz', pictureUrl: 'url1' },
        { id: monitorIdToDelete }
      );
  
      // Create mock response
      const res = mockResponse();
  
      // Call the deleteMonitor function
      deleteMonitor(req, res);
  
      // Expectations
      // Expect status to be called with 204 for successful deletion
      expect(res.status).toHaveBeenCalledWith(204);
      // Expect no JSON data to be sent in the response body for successful deletion
      //expect(res.json).not.toHaveBeenCalled();
    });
});

describe('updateMonitor function', () => {
    test('should update an existing monitor', () => {
      // Define the monitor ID to be updated
      const monitorId = '1';
  
      // Define the updated monitor data
      const updatedMonitorData = {
        brand: 'Brand 1',
        refreshRate: '60 Hz',
        pictureUrl: 'url1'
      };
  
      // Create mock request with the monitor ID and updated monitor data
      const req = mockRequest(
        { id: 1, brand: 'Brand 1', refreshRate: '60 Hz', pictureUrl: 'url1' },
        { id: monitorId}
      );
  
      // Create mock response
      const res = mockResponse();
  
      // Call the updateMonitor function
      updateMonitor(req, res);
  
      // Expectations
      // Expect json to be called with the updated monitor data
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining(updatedMonitorData));
    });
});