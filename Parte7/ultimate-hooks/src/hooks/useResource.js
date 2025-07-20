import { useState, useEffect } from "react";
import { getAll, createService } from "../services/services";

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const create = async (resource) => {
    const response = await createService(baseUrl, resource);
    setResources([...resources, response]);
  };

  const service = {
    create,
  };

  const fetchResources = async () => {
    const response = await getAll(baseUrl);
    setResources(response);
  };
  useEffect(() => {
    fetchResources();
  }, []);

  return [resources, service];
};

export { useResource };
