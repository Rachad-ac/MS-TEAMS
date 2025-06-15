package com.webgram.stage.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QOffreEmploiEntity is a Querydsl query type for OffreEmploiEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QOffreEmploiEntity extends EntityPathBase<OffreEmploiEntity> {

    private static final long serialVersionUID = -1444654280L;

    public static final QOffreEmploiEntity offreEmploiEntity = new QOffreEmploiEntity("offreEmploiEntity");

    public final DatePath<java.time.LocalDate> datePublication = createDate("datePublication", java.time.LocalDate.class);

    public final StringPath description = createString("description");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath titre = createString("titre");

    public QOffreEmploiEntity(String variable) {
        super(OffreEmploiEntity.class, forVariable(variable));
    }

    public QOffreEmploiEntity(Path<? extends OffreEmploiEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QOffreEmploiEntity(PathMetadata metadata) {
        super(OffreEmploiEntity.class, metadata);
    }

}

