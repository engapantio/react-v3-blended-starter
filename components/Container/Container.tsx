import styled from './Container.module.css';

interface ContainerPropss {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerPropss) {
  return <div className={styled.container}>{children}</div>;
}
