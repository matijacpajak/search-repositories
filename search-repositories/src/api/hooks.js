import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://api.github.com";

export const useRepositories = (q, sort, page) => {
  const [repos, setRepos] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async (params) => {
    setLoading(true);
    try {
      const result = await axios.get(`/search/repositories?${params}`);
      setRepos(result.data.items);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams({ q, sort, page });
    fetchData(params);
  }, [q, sort, page]);
  return { repos, error, loading };
};

export const useRepository = (owner, repository) => {
  const [repo, setRepo] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async (owner, repository) => {
    try {
      const result = await axios.get(`/repos/${owner}/${repository}`);
      setRepo(result.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(owner, repository);
  }, [owner, repository]);
  return { repo, error, loading };
};
