const USER_PASSWORD = "4w7MmMDFj43Mi9J";
const USER_NAME = "97ea8dd96a04f29e04e4f90139fd2a8a";
const DB_NAME = "97ea8dd96a04f29e04e4f90139fd2a8a";
const hostString = `11a.mongo.evennode.com:27018,11b.mongo.evennode.com:27018/${DB_NAME}?replicaSet=eu-11`;

export const uri = `mongodb://${USER_NAME}:${USER_PASSWORD}@${hostString}`;
